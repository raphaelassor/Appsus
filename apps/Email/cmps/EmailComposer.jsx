const { Link } = ReactRouterDOM;
import { utilService } from '../../../services/util-service.js';
import { emailService } from '../services/email-service.js';
export class EmailComposer extends React.Component {
  state = {
    sentEmail: {
      id: utilService.makeId(),
      sender: 'me',
      to: '',
      subject: '',
      body: '',
      isDraft: false,
      isSent: true,
    },
  };

  componentDidMount() {
    this.checkReceivedEmail();
    const searchParams = new URLSearchParams(this.props.location.search);
    var subject = searchParams.get('subject');
    var body = searchParams.get('body');
    var to = searchParams.get('to');
    if (subject || body || to) {
      subject ? subject : '';
      body ? body : '';
      to ? to : '';
      this.setState({
        sentEmail: {
          ...this.state.sentEmail,
          ['subject']: subject,
          ['body']: body,
          ['to']: to,
        },
      });
    }
  }

  checkReceivedEmail() {
    var id = this.props.match.params.id;
    if (id) {
      emailService.getEmailById(id).then((email) => {
        this.setState({ sentEmail: email });
      });
    } else {
      return;
    }
  }

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState({ sentEmail: { ...this.state.sentEmail, [field]: value } });
  };

  saveAsDraft = () => {
    var draft = { ...this.state.sentEmail, isDraft: true };
    emailService.saveToDrafts(draft);
  };

  onSendEmail = (ev) => {
    ev.stopPropagation();
    this.setState({
      sentEmail: { ...this.state.sentEmail, ['isDraft']: false },
    });
    var email = { ...this.state.sentEmail };
    email.sentAt = Date.now() / 1000;
    email.isDraft = false;
    email.isSent = true;
    emailService.saveToEmails(email);
  };
  render() {
    const { sender, to, subject, body } = this.state.sentEmail;
    return (
      <div className="email-composer-container">
        <div className="compose-header">
          <h4>Compose Message</h4>
          <Link to="/email">
            <button onClick={() => this.saveAsDraft()}>X</button>
          </Link>
        </div>
        <form className="composer">
          <label htmlFor="sender">From:</label>
          <input
            type="text"
            id="sender"
            name="sender"
            value={sender}
            multiple
            onChange={this.handleChange}
          />
          <label htmlFor="to">To:</label>
          <input
            type="email"
            id="to"
            name="to"
            value={to}
            onChange={this.handleChange}
          />
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={this.handleChange}
          />
          <textarea
            name="body"
            id="body"
            cols="30"
            rows="10"
            value={body}
            onChange={this.handleChange}
          ></textarea>
        </form>
        <div className="composer-actions">
          <Link to="/email">
            <button type="button" onClick={this.onSendEmail}>
              Send
            </button>
          </Link>
          <Link to={`/keep?title=${subject}&body=${body}`}>
            <button>Send to Note</button>
          </Link>
        </div>
      </div>
    );
  }
}
