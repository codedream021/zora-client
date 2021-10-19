import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { ethers } from 'ethers';
import { ClipLoader } from 'react-spinners';
import { useWeb3React } from '@web3-react/core';
import Skeleton from 'react-loading-skeleton';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import toast from 'react-hot-toast';
import InputError from '../InputError';

import { useWFTMContract } from 'contracts';
import PriceInput from 'components/PriceInput';
import showToast from 'utils/toast';
import { formatNumber, formatError } from 'utils';
import { useApi } from 'api';

import Modal from '../Modal';
import styles from './styles.module.scss';

const WFTMModal = ({ visible, onClose }) => {
  const { account, chainId } = useWeb3React();
  const { explorerUrl } = useApi();
  const { getWFTMBalance, wrapFTM, unwrapFTM } = useWFTMContract();

  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [wrappedBalance, setWrappedBalance] = useState(0);
  const [confirming, setConfirming] = useState(false);
  const [wrap, setWrap] = useState(true);
  const [amount, setAmount] = useState('');
  const [inputError, setInputError] = useState(null);

  const { price } = useSelector(state => state.Price);

  const getBalances = async (overrideLoading = false) => {
    if (!overrideLoading) {
      setLoading(true);
    }

    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    let [ftmBal, wftmBal] = await Promise.all([
      await provider.getBalance(account),
      await getWFTMBalance(account),
    ]);

    setBalance(parseFloat(ftmBal.toString()) / 10 ** 18);
    setWrappedBalance(parseFloat(wftmBal.toString()) / 10 ** 18);

    if (!overrideLoading) {
      setLoading(false);
    }

    return [
      parseFloat(ftmBal.toString()) / 10 ** 18,
      parseFloat(wftmBal.toString()) / 10 ** 18,
    ];
  };

  const pollBalanceChange = async (initialFtmBal, initialWftmBal) => {
    setLoading(true);
    let timeout;
    let updated = false;

    await new Promise(
      resolve =>
        (timeout = setTimeout(
          () =>
            getBalances(true).then(([ftmBal, wftmBal]) => {
              if (ftmBal !== initialFtmBal || wftmBal !== initialWftmBal) {
                updated = true;
              }
              resolve();
            }),
          200
        ))
    );

    if (!updated) {
      await pollBalanceChange(initialFtmBal, initialWftmBal);
    }

    clearTimeout(timeout);
    return setLoading(false);
  };

  useEffect(() => {
    if (visible) {
      setLoading(false);
      setConfirming(false);
      setWrap(true);
      setAmount('');
      getBalances();
    }
  }, [visible, chainId]);

  const parseBalance = bal => {
    return bal.toFixed(4);
  };

  const isMax = () => {
    if (wrap) {
      return amount === (balance - 0.01).toString();
    }
    return amount === wrappedBalance.toString();
  };

  const onMax = () => {
    if (wrap) {
      setAmount((balance - 0.01).toString());
    } else {
      setAmount(wrappedBalance.toString());
    }
  };

  const handleWrapFTM = async () => {
    if (confirming || loading) return;

    setConfirming(true);
    try {
      const price = ethers.utils.parseEther(amount);
      if (wrap) {
        const tx = await wrapFTM(price, account);
        await tx.wait();
        await pollBalanceChange(balance, wrappedBalance);
        const toastId = showToast(
          'success',
          'Wrapped FTM successfully!',
          '',
          () => {
            toast.dismiss(toastId);
            window.open(`${explorerUrl}/tx/${tx.hash}`, '_blank');
          }
        );
      } else {
        const tx = await unwrapFTM(price);
        await tx.wait();
        await pollBalanceChange(balance, wrappedBalance);
        const toastId = showToast(
          'success',
          'Unwrap W-FTM successfully!',
          '',
          () => {
            toast.dismiss(toastId);
            window.open(`${explorerUrl}/tx/${tx.hash}`, '_blank');
          }
        );
      }
      setAmount('');
    } catch (err) {
      showToast('error', formatError(err));
      console.log(err);
    } finally {
      setConfirming(false);
    }
    getBalances();
  };

  return (
    <Modal
      visible={visible}
      title="FTM / WFTM Station"
      onClose={onClose}
      submitDisabled={
        confirming ||
        loading ||
        inputError ||
        amount.length === 0 ||
        parseFloat(amount) === 0 ||
        parseFloat(amount) > (wrap ? balance - 0.01 : wrappedBalance)
      }
      submitLabel={
        confirming || loading ? (
          <ClipLoader color="#FFF" size={16} />
        ) : wrap ? (
          'Wrap'
        ) : (
          'Unwrap'
        )
      }
      onSubmit={() =>
        amount.length &&
        parseFloat(amount) > 0 &&
        parseFloat(amount) <= (wrap ? balance - 0.01 : wrappedBalance) &&
        handleWrapFTM()
      }
    >
      <div className={cx(styles.swapContainer, !wrap && styles.reverse)}>
        <div className={styles.swapBox}>
          <div className={styles.symbol}>FTM</div>
          <div className={styles.swapBoxInner}>
            <div className={styles.balance}>
              Balance:{' '}
              {loading ? (
                <Skeleton width={60} height={20} />
              ) : (
                parseBalance(balance)
              )}
              {wrap && !isMax() && !loading && balance > 0 && (
                <div className={styles.max} onClick={onMax}>
                  (Max)
                </div>
              )}
            </div>
            <div className={styles.rightBox}>
              <PriceInput
                className={styles.input}
                placeholder="0.0"
                decimals={18}
                value={'' + amount}
                onChange={setAmount}
                onInputError={setInputError}
              />
              <div className={styles.usdVal}>
                ${formatNumber(((parseFloat(amount) || 0) * price).toFixed(2))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.swapbtn} onClick={() => setWrap(!wrap)}>
          <SwapVertIcon className={styles.icon} />
        </div>
        <div className={styles.swapBox}>
          <div className={styles.symbol}>WFTM</div>
          <div className={styles.swapBoxInner}>
            <div className={styles.balance}>
              Balance:{' '}
              {loading ? (
                <Skeleton width={60} height={20} />
              ) : (
                parseBalance(wrappedBalance)
              )}
              {!wrap && !isMax() && !loading && balance > 0 && (
                <div className={styles.max} onClick={onMax}>
                  (Max)
                </div>
              )}
            </div>
            <div className={styles.rightBox}>
              <PriceInput
                className={styles.input}
                placeholder="0.0"
                decimals={18}
                value={'' + amount}
                onChange={setAmount}
                onInputError={setInputError}
              />
              <div className={styles.usdVal}>
                ${formatNumber(((parseFloat(amount) || 0) * price).toFixed(2))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <InputError text={inputError} />
    </Modal>
  );
};

export default WFTMModal;
