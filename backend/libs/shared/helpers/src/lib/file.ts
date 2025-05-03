import { promises as fs } from 'fs';

export async function checkDirectoryExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);

    return true;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }
}

export async function deleteDirectory(path: string): Promise<void> {
  if (await checkDirectoryExists(path)) {
    await fs.rm(path, { recursive: true });
  }
}

export async function createDirectory(path: string): Promise<void> {
  if (!(await checkDirectoryExists(path))) {
    await fs.mkdir(path, { recursive: true });
  }
}
