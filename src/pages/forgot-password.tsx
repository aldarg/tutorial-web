import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { useState } from 'react';
import { InputField } from 'src/components/inputField';
import { Wrapper } from 'src/components/Wrapper';
import { useForgotPasswordMutation } from 'src/generated/graphql';
import createUrqlClient from 'src/utils/createUrqlClient';

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box mt={10}>We've sent you an e-mail</Box>
          ) : (
            <Form>
              <Box mt="10">
                <InputField
                  name="email"
                  placeholder="e-mail"
                  label="E-mail"
                  type="email"
                />
              </Box>
              <Button
                mt={2}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                forgot password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
