const { Link } = ReactRouterDOM;
import { utilService } from '../../../services/util-service.js';
import { IconStar } from '../cmps/icon-cmps/IconStar.jsx';
import { IconReply } from '../cmps/icon-cmps/IconReply.jsx';
import { IconForward } from '../cmps/icon-cmps/IconForward.jsx';
import { IconTrash } from '../cmps/icon-cmps/IconTrash.jsx';
import { IconRead } from '../cmps/icon-cmps/IconRead.jsx';
import { IconUnread } from '../cmps/icon-cmps/IconUnread.jsx';
import { IconInbox } from '../cmps/icon-cmps/IconInbox.jsx';
import { IconEditEmail } from './icon-cmps/IconEditEmail.jsx';

export function EmailPreview({
  email,
  onDeleteEmail,
  toggleRead,
  onRestoreEmail,
  onStarEmail,
}) {
  return (
    <div
      className={`email-preview ${email.isRead ? 'read' : 'unread'}`}
      onClick={() => (email.isRead ? null : toggleRead(email.id))}
    >
      <Link className="preview-content" to={`/email/details/${email.id}`}>
        <div className="details-preivew">
          <h2 className="sender">{email.sender}</h2>
          <h4 className="from">{email.isSent ? email.to : email.from}</h4>
          <h4 className="preview-to">To: {email.to}</h4>
          <h3>{email.subject}</h3>
          <p>{email.body}</p>
        </div>
        <div className="time-details">
          <h3>
            {(email.sentAt ? utilService.getDateFromStamp(email.sentAt) : '') +
              ' ' +
              (email.sentAt ? utilService.getTimeFromStamp(email.sentAt) : '')}
          </h3>
        </div>
      </Link>
      <div className="quick-actions">
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
            toggleRead(email.id);
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
            onStarEmail(email.id);
          }}
        >
          {' '}
          <IconStar />
        </button>
        {email.isDraft ? (
          <Link to={`/email/compose/${email.id}`}>
            <button>
              <IconEditEmail />
            </button>{' '}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
