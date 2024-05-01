import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const WarningBox = ({ isVisible, message }) => {
  const [show, setShow] = useState([]);

  useEffect(() => {
    setShow(isVisible);
  }, [isVisible]);

  if(show) {
  return (
    <>
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{message}</p>
        </Alert>
      
    </>
  );
};
}

export default WarningBox;
