export const DUMMY_ACCOUNT = {
  fullName: "Midroc Investment Group",
};

export function getAccountDisplayName() {
  // Replace this dummy account with the authenticated backend profile when available.
  return DUMMY_ACCOUNT.fullName;
}
