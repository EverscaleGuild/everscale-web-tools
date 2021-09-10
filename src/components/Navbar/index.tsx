import React from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Address } from 'ton-inpage-provider';
import { convertAddress, convertTons } from '../../common';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export type NavbarProps = {
  hasTonProvider: boolean;
  walletAddress?: Address;
  walletBalance?: string;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
};

export const Navbar: React.FC<NavbarProps> = ({
  hasTonProvider,
  walletAddress,
  walletBalance,
  isConnecting,
  onConnect,
  onDisconnect
}) => {
  const { pathname } = useLocation();

  const itemClassName = (path: string) => {
    const isActive = path == pathname;
    return classNames({
      'navbar-item': true,
      'is-active': isActive,
      'is-primary': isActive
    });
  };

  return (
    <nav className="navbar is-spaced" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          💎
        </Link>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className={itemClassName('/executor')} to="/executor">
            Executor
          </Link>
          <Link className={itemClassName('/visualizer')} to="/visualizer">
            Visualizer
          </Link>
          <Link className={itemClassName('/serializer')} to="/serializer">
            Serializer
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {hasTonProvider ? (
                walletAddress == null ? (
                  <button
                    className={classNames('button', 'is-primary', { 'is-loading': isConnecting })}
                    onClick={onConnect}
                  >
                    <strong>Connect wallet</strong>
                  </button>
                ) : (
                  <>
                    {walletBalance != null && (
                      <CopyToClipboard text={walletBalance}>
                        <button className="button is-white">{convertTons(walletBalance)} TON</button>
                      </CopyToClipboard>
                    )}
                    <div className="field has-addons">
                      <div className="control">
                        <CopyToClipboard text={walletAddress.toString()}>
                          <button className="button is-light">{convertAddress(walletAddress.toString())}</button>
                        </CopyToClipboard>
                      </div>
                      <div className="control">
                        <button className={classNames('button', { 'is-loading': isConnecting })} onClick={onDisconnect}>
                          <span className="icon">
                            <i className="fas fa-sign-out-alt" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </>
                )
              ) : (
                <a
                  className="button is-light"
                  target="_blank"
                  href="https://chrome.google.com/webstore/detail/ton-crystal-wallet/cgeeodpfagjceefieflmdfphplkenlfk"
                >
                  <strong>Install wallet</strong>
                  <span className="icon">
                    <i className="fa fa-external-link-alt" />
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
