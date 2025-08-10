// components/emails/application-email.tsx
import * as React from 'react';

interface ApplicationEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  moveInDate?: string;
  introduction: string;
}

export const ApplicationEmail: React.FC<Readonly<ApplicationEmailProps>> = ({
  firstName,
  lastName,
  email,
  phone,
  moveInDate,
  introduction,
}) => (
  <div>
    <h1>Neue Zimmerbewerbung von {firstName} {lastName}</h1>
    <p>Eine neue Bewerbung für ein Zimmer bei der TTV Teutonia ist eingegangen.</p>
    <hr />
    <h2>Bewerberdaten:</h2>
    <ul>
      <li><strong>Name:</strong> {firstName} {lastName}</li>
      <li><strong>E-Mail:</strong> {email}</li>
      {phone && <li><strong>Telefon:</strong> {phone}</li>}
      {moveInDate && <li><strong>Gewünschtes Einzugsdatum:</strong> {moveInDate}</li>}
    </ul>
    <h2>Vorstellung:</h2>
    <p>{introduction}</p>
  </div>
);