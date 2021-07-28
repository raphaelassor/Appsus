const { Link } = ReactRouterDOM;

import { emailService } from '../services/email-service.js';
import { utilService } from '../../../services/util-service.js';
import { IconBack } from '../cmps/icon-cmps/IconBack.jsx';
import { IconStar } from '../cmps/icon-cmps/IconStar.jsx';
import { IconReply } from '../cmps/icon-cmps/IconReply.jsx';
import { IconForward } from '../cmps/icon-cmps/IconForward.jsx';
import { IconTrash } from '../cmps/icon-cmps/IconTrash.jsx';
import { IconRead } from '../cmps/icon-cmps/IconRead.jsx';
import { IconUnread } from '../cmps/icon-cmps/IconUnread.jsx';
import { IconInbox } from '../cmps/icon-cmps/IconInbox.jsx';

export function EmailDetails(props) {
  const emailId = props.match.params.id;
  const email = props.emails.find((email) => {
    return email.id === emailId;
  });
  return (
    <div className="email-details">
      <button onClick={() => props.history.push('/email')}>
        <IconBack />
      </button>
      <h3 className="details-time">
        {email.sentAt ? utilService.getTimeFromStamp(email.sentAt) : ''}
      </h3>
      <div>
        <h2>{email.sender}</h2>
        <h3>{email.subject}</h3>
        <h4>{`To: ${email.to}`}</h4>
      </div>
      <div>
        <p>{email.body}</p>
      </div>
      <div className="email-actions">
        {!email.isDraft ? (
          <Link
            to={`/email/compose?subject=${'Re:' + email.subject}&to=${
              email.from
            }`}
          >
            <button title="Reply">
              <IconReply />
            </button>
          </Link>
        ) : null}

        <Link
          to={`/email/compose?subject=${'Fw:' + email.subject}&body=${
            email.body
          }`}
        >
          {!email.isDraft ? (
            <button title="Forward">
              <IconForward />
            </button>
          ) : null}
        </Link>
        <button
          onClick={(ev) => {
            ev.stopPropagation();
            onDeleteEmail(email.id);
          }}
          title="Send to Trash"
        >
          <IconTrash />
        </button>
        <button
          onClick={(ev) => {
            ev.stopPropagation();
            props.toggleRead(email.id);
          }}
          title={email.isRead ? 'Mark as Unread' : 'Mark as Read'}
        >
          {email.isRead ? <IconRead /> : <IconUnread />}
        </button>
        {email.isTrash ? (
          <button
            onClick={(ev) => {
              ev.stopPropagation();
              onRestoreEmail(email.id);
            }}
            title="Send to Inbox"
          >
            {' '}
            <IconInbox />
          </button>
        ) : null}
        <button
          className={email.isStarred ? 'starred' : ''}
          onClick={(ev) => {
            ev.stopPropagation();
            props.onStarEmail(email.id);
          }}
        >
          {' '}
          <IconStar />
        </button>
        {email.isDraft ? (
          <Link to={`/email/compose/${email.id}`}>
            <button>Edit</button>{' '}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
