// ... existing interfaces ...

export interface ModerationResult {
  inappropriate?: boolean;
  spam?: boolean;
  harmful?: boolean;
  sensitive?: boolean;
  error?: string;
}