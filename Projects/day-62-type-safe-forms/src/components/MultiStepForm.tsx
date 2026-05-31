import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

import { registrationSchema } from '../schemas/formSchema';
import type { MultiStepFormData, StepFieldNames } from '../schemas/formSchema';
import { StepProgressBar } from './StepProgressBar';
import { StepPersonalInfo } from './StepPersonalInfo';
import { StepAccountDetails } from './StepAccountDetails';
import { StepConfirmation } from './StepConfirmation';
import { SuccessScreen } from './SuccessScreen';

export const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<MultiStepFormData | null>(null);

  const methods = useForm<MultiStepFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false as any,
    },
  });

  const { trigger, handleSubmit, reset } = methods;

  // Handles moving to the next step with scoped validation
  const handleNext = async () => {
    let fieldsToValidate: StepFieldNames[] = [];

    if (step === 1) {
      fieldsToValidate = ['firstName', 'lastName', 'email', 'phone'];
    } else if (step === 2) {
      fieldsToValidate = ['username', 'password', 'confirmPassword'];
    }

    // Trigger validation only on current step fields
    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleReset = () => {
    reset();
    setStep(1);
    setSubmittedData(null);
  };

  const onSubmitForm = async (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API delay for a premium feel
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmittedData(data as MultiStepFormData);
    setStep(4); // Success step
  };

  // Step transitions animations
  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' as any } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.25, ease: 'easeIn' as any } }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <StepPersonalInfo />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <StepAccountDetails />
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <StepConfirmation />
          </motion.div>
        );
      default:
        return null;
    }
  };

  const getStepSubtitle = () => {
    if (step === 1) return 'Provide your contact details';
    if (step === 2) return 'Secure your profile settings';
    if (step === 3) return 'Review your profile configuration';
    return '';
  };

  return (
    <div className="glass-card">
      {step < 4 ? (
        <>
          <div className="form-header">
            <h1 className="form-title">Create Account</h1>
            <p className="form-subtitle">{getStepSubtitle()}</p>
          </div>

          <StepProgressBar currentStep={step} />

          {/* Form Context Provider wrapper */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmitForm)} noValidate>
              
              <div style={{ minHeight: '340px' }}>
                <AnimatePresence mode="wait">
                  {renderStepContent()}
                </AnimatePresence>
              </div>

              {/* Navigation buttons */}
              <div className={`button-group ${step === 1 ? 'full-width' : ''}`}>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn btn-secondary"
                    disabled={isSubmitting}
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn btn-primary"
                  >
                    Next Step
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Complete Registration
                        <ShieldCheck size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>

            </form>
          </FormProvider>
        </>
      ) : (
        <SuccessScreen formData={submittedData} onReset={handleReset} />
      )}
    </div>
  );
};
export default MultiStepForm;
