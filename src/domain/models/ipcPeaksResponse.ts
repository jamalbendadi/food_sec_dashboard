
import type { IPCPhaseBody } from '@/domain/models/ipcPhaseBody';

export interface IPCPeaksResponse {
  statusCode: string;
  body: {
    year: number;
    ipc_peaks: IPCPhaseBody[];
  };
}
