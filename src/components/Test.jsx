import React, { useState } from 'react';
import { Flex, Box, Input, Button } from '@blockstack/ui';
import { useConnect } from '@blockstack/connect';
import { openContractDeploy, openContractCall } from '@blockstack/connect';

export default function Test() {
  const { doContractCall } = useConnect();
  const [txID, setTxID] = useState();

  const onClick = async () => {
    const callOptions = {
      contractAddress: 'ST14K89W7P6SY7G388V3PSFGEJPQWEVM2YZD76RS',
      contractName: 'my-contract-name17',
      functionName: 'say-hi',
      functionArgs: [],
      appDetails: {
        name: 'SuperApp',
        icon: 'https://example.com/icon.png',
      },
      finished: data => {
        console.log(data);
        console.log('TX ID:', data.txId);
        console.log('Raw TX:', data.txRaw);
      },
    };
    await doContractCall(callOptions);
  };
  //const authOrigin = 'https://app.blockstack.org';

  const onDeploy = () => {
    const codeBody = '(define-public (say-hi) (ok "hello world"))';
    const options = {
      contractName: 'my-contract-name17',
      codeBody,
      appDetails: {
        name: 'My-App',
        icon: '',
      },
      finished: data => {
        console.log(data.txId);
        //console.log(data);
        setTxID(data.txId);
      },
    };
    openContractDeploy(options);
  };
  const onCheckTxn = () => {
    if (txID) {
      const res = fetch(`https://sidecar.staging.blockstack.xyz/sidecar/v1/tx/${txID}`)
        .then(res => res.json())
        .then(res => console.log(res));
    } else {
      console.log('Contract Not Deployed');
    }
  };

  const [focused, setFocused] = useState(false);
  return (
    <Box width="100%" backgroundColor={focused ? 'white' : 'white'} px={3} py={0}>
      <div>Hello</div>
      <Button onClick={onDeploy}>Deploy my contract</Button>
      <Button onClick={onCheckTxn}>Check Transaction</Button>
      <Button onClick={onClick}>Call my contract</Button>
    </Box>
  );
}
