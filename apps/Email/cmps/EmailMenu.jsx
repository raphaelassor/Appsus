const { Link } = ReactRouterDOM;
import { IconStar } from '../cmps/icon-cmps/IconStar.jsx';
import { IconTrash } from '../cmps/icon-cmps/IconTrash.jsx';
import { IconInbox } from '../cmps/icon-cmps/IconInbox.jsx';
import { IconEditEmail } from './icon-cmps/IconEditEmail.jsx';
import { IconOutbox } from './icon-cmps/IconOutbox.jsx';

export function EmailMenu({ onSetView, unreadCount }) {
  return (
    <div className="email-menu">
      <ul className="menu-actions clean-list">
        <Link to="/email">
          <li onClick={() => onSetView('inbox')}>
            <IconInbox />
            {`Inbox (${unreadCount})`}
          </li>
        </Link>
        <li onClick={() => onSetView('sent')}>
          <IconOutbox />
          {'  '}Outbox
        </li>
        <li onClick={() => onSetView('drafts')}>
          <IconEditEmail />
          {'  '}Drafts
        </li>
        <li onClick={() => onSetView('starred')}>
          <IconStar />
          {'  '}Starred
        </li>
        <li onClick={() => onSetView('trash')}>
          <IconTrash />
          {'  '}Trash
        </li>
      </ul>
    </div>
  );
}
