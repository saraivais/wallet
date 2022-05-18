import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { userMail } = this.props;
    return (
      <header>
        <div>
          <p>
            Email:
            <span data-testid="email-field">{userMail}</span>
          </p>
          <p>
            Despesa Total:
            <span data-testid="total-field">0</span>
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </div>
      </header>
    );
  }
}
// change total & currency later maybe?

const mapStateToProps = (state) => ({
  userMail: state.user.email,
});

Header.propTypes = {
  userMail: propTypes.string.isRequired,
};
// export default Header;
export default connect(mapStateToProps)(Header);
