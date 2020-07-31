import React, { useState } from 'react';
import { Flex, Box, Input, Button } from '@blockstack/ui';
import { useConnect } from '@blockstack/connect';
import { openContractDeploy } from '@blockstack/connect';

export default function Test() {
  const { doContractCall } = useConnect();

  const onClick = async () => {
    const opts = {
      /** See examples above */
    };
    await doContractCall(opts);
  };
  //const authOrigin = 'https://app.blockstack.org';

  const onDeploy = () => {
    const codeBody = '(begin (print "hello, world"))';
    openContractDeploy({
      contractName: 'my-contract-name',
      codeBody,
      appDetails: {
        name: 'SuperApp',
        icon: 'https://example.com/icon.png',
      },
      finished: data => {
        console.log(data.txId);
      },
    });
  };

  const [focused, setFocused] = useState(false);
  return (
    <Box width="100%" backgroundColor={focused ? 'white' : 'white'} px={3} py={0}>
      <div>Hello</div>
      <Button onClick={onDeploy}>Deploy my contract</Button>
      <Button onClick={onClick}>Call my contract</Button>
    </Box>
  );
}
