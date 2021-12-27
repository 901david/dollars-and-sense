export interface SignUpProps {
  handleSignUpSuccess: () => void;
  triggerLoader: (trigger: boolean) => void;
  duplicateEmailTriggered: () => void;
}
