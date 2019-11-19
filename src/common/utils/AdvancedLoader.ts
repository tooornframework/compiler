import * as fs from "fs";
import * as path from "path";

export class AdvancedLoader {
    public loadAll(rootDir: string) {
        this.walk(rootDir, (fp) => {
            if (fp.endsWith('.js')) {
                require(fp);
            }
        });
    }

    private walk(dir: string, callback: (fp: string) => void) {
        fs.readdirSync(dir).forEach( f => {
            let dirPath = path.join(dir, f);
            let isDirectory = fs.statSync(dirPath).isDirectory();
            isDirectory ? this.walk(dirPath, callback) : callback(path.join(dir, f));
        });
    }
}