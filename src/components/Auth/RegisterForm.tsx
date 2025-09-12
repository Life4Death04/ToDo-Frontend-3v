import type { ChangeEvent, FormEvent } from "react";
import type { FormData } from "../../containers/RegisterContainer";
import { 
    Input, 
    Header, 
    Footer, 
    SubmitBtn, 
    Button,
} from "../Common/CommonComponents";
import { useTranslation } from "react-i18next";

// -------------------- Types --------------------
type RegisterFormProps = {
    values: FormData,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onSubmit: (e: FormEvent) => void,
    isError: boolean,
    isPending: boolean,
    isSuccess: boolean,
    error: Error | null,
    fieldErrors?: Partial<ErrorTypes>
    onLanguageChange: () => void
}

type ErrorTypes = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const errorMessages:ErrorTypes = {
    email: "Email already in use",
    password: "Passwords don't match"
}

// -------------------- Main Register Component --------------------
/**
 * RegisterForm
 *
 * Controlled registration form. The parent container must supply all input
 * values and handlers. This component shows a success message when `isSuccess`
 * is true and maps `fieldErrors` to specific inputs.
 *
 * Props:
 * @param values - controlled values for firstName, lastName, email, password, confirmPassword
 * @param onChange - input change handler
 * @param onSubmit - form submit handler
 * @param isPending - whether registration request is in progress
 * @param error - optional server error object
 * @param isSuccess - whether registration succeeded (used to show a message)
 * @param fieldErrors - optional per-field error messages
 *
 * Usage example:
 * <RegisterForm values={values} onChange={handleChange} onSubmit={handleSubmit} isPending={loading} isSuccess={created} fieldErrors={fieldErrors} />
 */
export default function RegisterForm({ values, onChange, onSubmit, isPending, error, isSuccess, fieldErrors, onLanguageChange }: RegisterFormProps){
    const { t } = useTranslation("translation");
    return(
        <main className="flex items-center justify-center">
            <section className="bg-white text-center mx-auto w-max-auth shadow-2xl rounded-xl p-8 pt-4 bg0">
                <Header 
                    textH2={t("auth.header.register.title")}
                    label={t("auth.header.register.subtitle")}
                />
                <form className="flex flex-col content-around" onSubmit={onSubmit}>
                        <div className="flex justify-between gap-8">
                            <Input 
                                type="text" 
                                name="firstName"
                                label={t("auth.register.firstName")}
                                placeholder={t("auth.register.placeholders.firstName")}
                                value={values.firstName} 
                                onChange={onChange}
                                error={fieldErrors?.firstName ? new Error(fieldErrors.firstName) : undefined}>
                            </Input>
                            <Input 
                                type="text" 
                                name="lastName"
                                label={t("auth.register.lastName")}
                                placeholder={t("auth.register.placeholders.lastName")}
                                value={values.lastName}
                                onChange={onChange}
                                error={fieldErrors?.lastName ? new Error(fieldErrors.lastName) : undefined}>
                            </Input>
                        </div>
                        <Input 
                            type="email" 
                            name="email"
                            label={t("auth.register.email")}
                            placeholder={t("auth.register.placeholders.email")}
                            required={true}
                            value={values.email}
                            onChange={onChange}
                            error={(error?.message === errorMessages.email) ? error : undefined}
                        >
                        </Input>
                        <Input 
                            type="password" 
                            name="password"
                            label={t("auth.register.password")}
                            placeholder={t("auth.register.placeholders.password")}
                            required={true}
                            value={values.password}
                            onChange={onChange}
                            error={fieldErrors?.password ? new Error(fieldErrors.password) : undefined}
                        >
                        </Input>
                        <Input 
                            type="password" 
                            name="confirmPassword"
                            label={t("auth.register.confirmPassword")}
                            placeholder={t("auth.register.placeholders.confirmPassword")}
                            required={true}
                            value={values.confirmPassword}
                            onChange={onChange}
                            error={fieldErrors?.confirmPassword ? new Error(fieldErrors.confirmPassword) : undefined}
                        >
                        </Input>
                        <SubmitBtn 
                            buttonText={t("auth.register.submit")}
                            isPending={isPending}
                        />
                        {isSuccess && <p className="bg-green-100 text-green-800 border border-green-800 mt-4 w-fit mx-auto px-2 py-1 rounded-lg xsm:text-xs md:text-sm lg:text-base">{t("auth.register.successMessage")}</p>}
                </form>
                <Footer 
                    label={t("auth.register.haveAccount")}
                    buttonText={t("auth.register.login")}
                    buttonUrl="/"
                />

                <div className="mt-4">
                    <Button 
                        textButton={'EN / ES'}
                        iconStyle="fa-solid fa-earth-americas"
                        onClick={onLanguageChange}
                    />
                </div>
            </section>
        </main>
    );
}