import React from 'react';
import MailBox from './components/mailbox';

import Global, {Wrapper} from './global';

function App() {
  return (
    <>
    <Global />
    <Wrapper>
      <MailBox></MailBox>
    </Wrapper>
  </>
  
  );
}

export default App;
