import path from "path";

// Determine upload directory based on environment
export function getUploadDir() {
    // In Railway production with volume
    if (process.env.RAILWAY_VOLUME_MOUNT_PATH) {
        return process.env.RAILWAY_VOLUME_MOUNT_PATH;
    }

    // In Railway production without explicit env (fallback)
    if (process.env.NODE_ENV === 'production') {
        return '/uploads'; // Default Railway volume path
    }

    // Local development
    return path.join(process.cwd(), "public/uploads");
}

export const UPLOAD_DIR = getUploadDir();