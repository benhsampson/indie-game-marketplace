import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

const INSTANCE = this;

export default class PaymentTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processingPayment: false
    };
  }
  componentWillMount() {
    const SELF = this;

    INSTANCE.checkout = INSTANCE.StripeCheckout.configure({
      key: Meteor.settings.public.stripe,
      image: SELF.props.image,
      locale: 'auto',
      token(token) {
        const charge = {
          amount: token.amount || SELF.props.price * 100,
          currency: token.currency || 'usd',
          source: token.id,
          description: token.description || SELF.props.title,
          receipt_email: token.email
        };
        Meteor.call('processPayment', charge, (err, res) => {
          if (err) {
            SELF.setState({processingPayment: false});
            console.log(err.reason);
          } else {
            console.log('processingPayment!', 'Payment completed!');
            return res;
          }
        });
      },
      closed() {
        SELF.setState({processingPayment: false});
      }
    });
  }
  purchaseGame() {
    console.log('Purchasing product...');
    this.setState({processingPayment: true});

    INSTANCE.checkout.open({
      name: this.props.title,
      description: this.props.description,
      amount: this.props.price * 100,
      bitcoin: true
    });
  }
  render() {
    const { processingPayment } = this.state;

    return (
      <div>
        {processingPayment ? <p>Processing payment...</p> : <button onClick={this.purchaseGame.bind(this)}>Buy '{this.props.title}'</button>}
      </div>
    );
  }
}
