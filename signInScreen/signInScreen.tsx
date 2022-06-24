import LogoSvg from 'assets/svg/LogoSvg';
import { AxiosError } from 'axios';
import { NoTab } from 'common/assets/svg';
import NotabSplash from 'common/assets/svg/NotabSplash';
import { PhoneField, PrimaryButtonAsync } from 'common/components';
import {
  BACK_IMAGES,
  BUTTON,
  CONST,
  FIELD,
  TEXT,
  USA_PHONE_CODE,
  VALIDATION,
} from 'common/constants';
import { useApiToast } from 'common/hooks';
import {
  composeValidators,
  isPhoneNumber,
  isRequired,
  parsePhoneNumber,
} from 'common/services';
import colors from 'common/styles/colors';
import useGetSmsCode from 'hooks/useGetSmsCode';
import { DefaultLayout } from 'layouts';
import AppRoutes from 'navigations/routes';
import React, { FC, useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { Keyboard, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SigninScreenProps } from '../GuestNavigator';
import styles from './styles';

const SigninScreen: FC<SigninScreenProps> = ({ navigation }) => {
  const toast = useApiToast();
  const getSmsCode = useGetSmsCode();
  const insets = useSafeAreaInsets();
  const phoneField = useRef<TextInput>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (values: { phone: string }) => {
    setIsLoading(true);
    getSmsCode({
      phone: parsePhoneNumber(values.phone),
    })
      .then(({ data: smscode }) => {
        Keyboard.dismiss();
        // Once the code send success to given user phone number user will navigate to code input screen
        setTimeout(() => {
          navigation.navigate(AppRoutes.SigninSmsCode, {
            ...values,
            smscodeParams: String(smscode),
          });
        }, 1000);
        setIsLoading(false);
      })
      .catch((error: AxiosError) => {
        setIsLoading(false);
        toast.show(
          error.response?.status,
          error.response ? error.response?.data?.message : error.message,
        );
      });
  };

  return (
    <>
      <DefaultLayout backImage={BACK_IMAGES.SIGNIN}>
        <DefaultLayout.KeyboardAwareScrollView>
          <View
            style={[
              styles.container,
              {
                paddingTop: insets.top + CONST._100,
                marginBottom: insets.bottom,
              },
            ]}>
            <View style={styles.upperView}>
              <LogoSvg strokeColor={colors.white} />

              <View style={styles.logoView}>
                <NoTab />
              </View>

              <Text style={styles.txtTitle}>{TEXT.ITS_YOUR_NIGHT}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>{TEXT.ENTER_PHONE_NUMBER}</Text>
              <Text style={styles.subTitle}>{TEXT.FILL_YOUR_INFO}</Text>

              <Form
                initialValues={{
                  phone: USA_PHONE_CODE,
                }}
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                  <>
                    <Field
                      name={FIELD.PHONE}
                      render={(field) => (
                        <PhoneField
                          {...field}
                          autoFocus
                          inputRef={phoneField}
                        />
                      )}
                      validate={composeValidators(
                        isRequired(VALIDATION.FIELD_REQUIRED),
                        isPhoneNumber(VALIDATION.PHONE_NOT_VALID),
                      )}
                      showError
                    />
                    <View style={styles.bottonView}>
                      <PrimaryButtonAsync
                        text={BUTTON.SIGNIN_WITH_PHONE_NUMBER}
                        onPress={() => handleSubmit()}
                        isLoading={isLoading}
                      />
                    </View>
                  </>
                )}
              />
            </View>
            <View style={styles.bottomContainer}>
              <NotabSplash />
            </View>
          </View>
        </DefaultLayout.KeyboardAwareScrollView>
      </DefaultLayout>
    </>
  );
};

export default SigninScreen;
