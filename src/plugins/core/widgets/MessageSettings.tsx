import * as React from 'react';
import { Settings } from '../../interfaces';

interface Props {
  message?: string;
  onChange: (settings: Settings) => void;
}

const MessageSettings: React.StatelessComponent<Props> = ({ message = 'Add something witty', onChange }) => {
  return (
    <div>
      <label>
        Message
        <input
          type="text"
          value={message}
          onChange={event => onChange({ message: event.target.value })}
        />
      </label>
    </div>
  );
};

export default MessageSettings;
