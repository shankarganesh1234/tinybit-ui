import {Injectable} from '@angular/core';
import * as IpfsApi from 'ipfs-api';
import {constants} from "../constants";

declare let window: any;

@Injectable()
export class IPFSService {
    ipfs: IpfsApi;

    constructor() {
            this.bootstrapIPFS();
    }

    /**
     * Check and init ipfs
     */
    public bootstrapIPFS() {
        // Checking if IPFS has already been injected in the browser
        if (typeof window.ipfs !== 'undefined') {
            // IPFS API aready loaded
            console.log('IPFS API aready loaded');
        } else {
            // inject ipfs
            this.ipfs = new IpfsApi({host: constants._ipfsHost, port: '5001', protocol: constants._ipfsProtocol});
        }
    }
}
