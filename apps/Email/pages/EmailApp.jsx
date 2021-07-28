const { Route, Switch } = ReactRouterDOM;
import { EmailMenu } from '../cmps/EmailMenu.jsx';
import { EmailList } from '../cmps/EmailList.jsx';
import { EmailDetails } from '../cmps/EmailDetails.jsx';
import { emailService } from '../services/email-service.js';
import { EmailFilter } from '../cmps/EmailFilter.jsx';
import { EmailComposer } from '../cmps/EmailComposer.jsx';

export class EmailApp extends React.Component {
  state = {
    emails: null,
    view: 'inbox',
    filterBy: null,
    sortBy: null,
    darkMode: false,
  };

  componentDidMount() {
    this.loadEmails();
  }

  loadEmails = () => {
    emailService.query(this.state.filterBy).then((emails) => {
      var unreadCount = () => {
        var counter = 0;
        for (var i = 0; i < emails.length; i++) {
          if (!emails[i].isRead) counter++;
        }
        return counter;
      };
      this.setState({ unreadCount: unreadCount() });
      if (this.state.sortBy) this.sortEmails(emails);
      this.setState({ emails: emails });
    });
  };

  toggleRead = (emailId) => {
    emailService.setReadState(emailId).then(this.loadEmails);
  };

  onDeleteEmail = (emailId) => {
    emailService.deleteEmail(emailId).then(this.loadEmails);
  };

  onRestoreEmail = (emailId) => {
    emailService.restoreEmail(emailId).then(this.loadEmails);
  };

  onStarEmail = (emailId) => {
    emailService.starEmail(emailId).then(this.loadEmails);
  };
  onSetView = (view) => {
    this.setState({ view });
  };

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadEmails);
  };
  onSetSort = (sortBy) => {
    this.setState({ sortBy }, this.loadEmails);
  };
  sortEmails(arr) {
    const { sortBy } = this.state;
    arr.sort(function (a, b) {
      if (sortBy === 'sender') {
        if (a.sender < b.sender) return -1;
        if (a.sender > b.sender) return 1;
        return 0;
      } else if (sortBy === 'date') {
        if (a.sentAt < b.sentAt) return 1;
        if (a.sentAt > b.sentAt) return -1;
        return 0;
      } else if (sortBy === 'read') {
        return a.isRead === b.isRead ? 0 : a ? -1 : 1;
      }
    });
  }

  toggleDark = () => {
    if (this.state.darkMode) this.setState({ darkMode: false });
    else this.setState({ darkMode: true });
  };
  setEmailsForDisplay = () => {
    const { emails, view } = this.state;
    if (view === 'inbox')
      return emails.filter((email) => !email.isTrash && !email.isDraft);
    else if (view === 'trash')
      return emails.filter((email) => email.isTrash && !email.isDraft);
    else if (view === 'sent') return emails.filter((email) => email.isSent);
    else if (view === 'drafts') return emails.filter((email) => email.isDraft);
    else if (view === 'starred')
      return emails.filter((email) => email.isStarred);
  };

  render() {
    const { emails, unreadCount, darkMode } = this.state;
    if (!emails) {
      return (
        <section>
          <h1>Loading you Emails...</h1>
        </section>
      );
    }
    return (
      <section className={`email-app ${darkMode ? 'dark' : ''}`}>
        <div className="email-greet">
          <h3 className="dark-toggle-text">Toggle Dark Mode: </h3>
          <label className="switch">
            <input type="checkbox" onClick={this.toggleDark} />
            <span className="slider round"></span>
          </label>
          <h1>Welcome to Email!</h1>
        </div>
        <div className="emails-main-container">
          <EmailFilter
            onSetFilter={this.onSetFilter}
            onSetSort={this.onSetSort}
          />
          <div className="email-display">
            <EmailMenu onSetView={this.onSetView} unreadCount={unreadCount} />
            <Switch>
              <Route
                path="/email/details/:id"
                render={(props) => (
                  <EmailDetails
                    {...props}
                    emails={emails}
                    toggleRead={this.toggleRead}
                    onDeleteEmail={this.onDeleteEmail}
                    onRestoreEmail={this.onRestoreEmail}
                    onStarEmail={this.onStarEmail}
                  />
                )}
              />
              <Route
                path="/email"
                render={(props) => (
                  <EmailList
                    {...props}
                    view={this.state.view}
                    emails={this.setEmailsForDisplay()}
                    toggleRead={this.toggleRead}
                    onDeleteEmail={this.onDeleteEmail}
                    onRestoreEmail={this.onRestoreEmail}
                    onStarEmail={this.onStarEmail}
                  />
                )}
              />
            </Switch>
            <Route
              path="/email/compose/:id?"
              render={(props) => (
                <EmailComposer {...props} onSetFilter={this.onSetFilter} />
              )}
            />
          </div>
        </div>
      </section>
    );
  }
}
