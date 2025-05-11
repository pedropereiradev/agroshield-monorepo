import { concat, sha256 } from 'fuels';

interface SubIdInput {
  crop: string;
  startDate: string;
  endDate: string;
  regionX: number;
  regionY: number;
  policyType: string;
}

function stringToBytes(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

export function createSubId(payload: SubIdInput) {
  const cropBytes = stringToBytes(payload.crop);
  const startDateBytes = stringToBytes(payload.startDate);
  const endDateBytes = stringToBytes(payload.endDate);
  const policyTypeBytes = stringToBytes(payload.policyType);

  const regionXBytes = numberToLEBytes(payload.regionX);
  const regionYBytes = numberToLEBytes(payload.regionY);

  return sha256(
    concat([
      cropBytes,
      startDateBytes,
      endDateBytes,
      regionXBytes,
      regionYBytes,
      policyTypeBytes,
    ])
  );
}

function numberToLEBytes(num: number, byteLength = 8): Uint8Array {
  const buffer = new ArrayBuffer(byteLength);
  const view = new DataView(buffer);

  if (byteLength === 8) {
    view.setBigUint64(0, BigInt(num), true);
  } else if (byteLength === 4) {
    view.setUint32(0, num, true);
  } else if (byteLength === 2) {
    view.setUint16(0, num, true);
  } else if (byteLength === 1) {
    view.setUint8(0, num);
  }

  return new Uint8Array(buffer);
}
