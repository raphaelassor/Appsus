import { EmailPreview } from './EmailPreview.jsx';

export function EmailList({
  emails,
  toggleRead,
  onDeleteEmail,
  onRestoreEmail,
  onStarEmail,
}) {
  if (emails.length > 0) {
    return (
      <div className="email-list">
        {emails.map((email) => (
          <EmailPreview
            email={email}
            key={email.id}
            toggleRead={toggleRead}
            onDeleteEmail={onDeleteEmail}
            onRestoreEmail={onRestoreEmail}
            onStarEmail={onStarEmail}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="email-list empty">
        <h1>This box is empty!</h1>
      </div>
    );
  }
}
