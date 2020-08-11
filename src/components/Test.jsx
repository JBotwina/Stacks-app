import React, { useState } from 'react';
import { Flex, Box, Input, Button, ButtonGroup, Text } from '@blockstack/ui';
import { UserSession } from 'blockstack';
import { useConnect } from '@blockstack/connect';
import { openContractDeploy, openContractCall } from '@blockstack/connect';

export default function Test(props) {
  const { doContractCall } = useConnect();
  const [txID, setTxID] = useState();
  const [callTxID, setCallTxID] = useState();
  const [functionReturn, setFunctionReturn] = useState();

  //const userSession = new UserSession();

  const onClick = async () => {
    //console.log(props.test);
    const callOptions = {
      contractAddress: props.test.userData.profile.stxAddress,
      contractName: 'xthCaller10',
      functionName: 'incrementCurr',
      functionArgs: [],
      appDetails: {
        name: 'SuperApp',
        icon: 'https://example.com/icon.png',
      },
      finished: data => {
        console.log(data);
        console.log('TX ID:', data.txId);
        console.log('Raw TX:', data.txRaw);
        setCallTxID(data.txId);
        const res = fetch(`https://sidecar.staging.blockstack.xyz/sidecar/v1/tx/${data.txId}`)
          .then(res => res.json())
          .then(data => {
            console.log(data);
          });
      },
    };
    await doContractCall(callOptions);
  };
  //const authOrigin = 'https://app.blockstack.org';
  const checkFunctionCall = () => {
    const res = fetch(`https://sidecar.staging.blockstack.xyz/sidecar/v1/tx/${callTxID}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.tx_status === 'success') {
          setFunctionReturn(data.tx_result.repr);
        }
      });
  };

  const onDeploy = () => {
    //const codeBody = '(define-public (say-hi) (ok "hello world"))';
    const codeBody =
      '(define-data-var curr int 0) (define-private (resetCurr) (begin (var-set curr 0) (ok "You won"))) (define-public (incrementCurr) (begin (var-set curr (+ (var-get curr) 1)) (if (is-eq (var-get curr) 2) (resetCurr) (ok "Try again"))))';
    const options = {
      contractName: 'xthCaller10',
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

  return (
    <>
      <Flex>
        <Box maxWidth="1000px" width="100%" mx="auto" mt="75px">
          <Flex width="100%" flexWrap="wrap">
            <ButtonGroup spacing={'base'}>
              <Button onClick={onDeploy}>Deploy my contract</Button>
              <Button onClick={onCheckTxn}>Check Transaction</Button>
              <Button onClick={onClick}>Call Contract's Function</Button>
              <Button onClick={checkFunctionCall}>Check If You Won</Button>
            </ButtonGroup>
          </Flex>
        </Box>
      </Flex>
      <Text>
        {functionReturn
          ? 'The return of the function is' + functionReturn
          : 'Contract has yet to be called'}
      </Text>
    </>
  );
}
