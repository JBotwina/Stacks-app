import React, { useState } from 'react';
import { Flex, Box, Input, Button, ButtonGroup, Text } from '@blockstack/ui';

export default function GaiaTest(props) {
  const [value, setValue] = useState('');

  const handleChange = val => {
    console.log(val.target.value);
    setValue(val.target.value);
  };
  const onSubmit = () => {
    console.log(value);
    //console.log(props.test);
    const putOptions = {
      encrypt: false,
    };

    props.test.session.putFile('hello3.txt', value, putOptions).then(url => {
      // /hello.txt exists now, and has the contents "hello world!".
      console.log('file now exists at:: ', url);
      console.log(value);
    });
  };
  const onReadSubmit = () => {
    const readOptions = {
      decrypt: false,
    };
    props.test.session.getFile('hello3.txt', readOptions).then(fileContents => {
      // get the contents of the file /hello.txt
      console.log(fileContents);
    });
  };

  return (
    <div>
      <Input value={value} onChange={handleChange} placeholder="Save something to Gaia" />
      <Button onClick={onSubmit}>Submit Your Text</Button>
      <Button onClick={onReadSubmit}>Read That Text Baby!</Button>
    </div>
  );
}
