import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditForm from '../components/EditForm';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    const { editor } = this.props;
    return (
      <div>
        <header>
          <Header />
        </header>
        <br />

        <main>
          {editor ? <EditForm /> : <WalletForm />}
          <br />
          <Table />
        </main>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  editor: state.wallet.editor,
});

Wallet.propTypes = {
  editor: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
