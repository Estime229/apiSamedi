export type ScanResult = {
  blocked: boolean;
  reasons: string[];
  severity?: number; // 0..1
};
