/**
 * Copyright 2019 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import { ChaincodeStub } from 'fabric-shim';

export class TestStub implements ChaincodeStub {
    private map = new Map<string, Buffer>();
    private privateMap = new Map<string, Buffer>();

    async getState(key: string): Promise<Buffer> {
        return this.map.get(key);
    }
    async putState(key: string, value: Buffer): Promise<void> {
        this.map.set(key, value);
    }
    getArgs(): string[] {
        throw new Error('Method not implemented.');
    }
    getStringArgs(): string[] {
        throw new Error('Method not implemented.');
    }
    getFunctionAndParameters(): { params: string[]; fcn: string; } {
        throw new Error('Method not implemented.');
    }
    getTxID(): string {
        throw new Error('Method not implemented.');
    }
    getChannelID(): string {
        throw new Error('Method not implemented.');
    }
    getCreator(): import('fabric-shim').SerializedIdentity {
        throw new Error('Method not implemented.');
    }
    getTransient(): Map<string, Buffer> {
        throw new Error('Method not implemented.');
    }
    getSignedProposal(): import('fabric-shim').ChaincodeProposal.SignedProposal {
        throw new Error('Method not implemented.');
    }
    getTxTimestamp(): import('google-protobuf/google/protobuf/timestamp_pb').Timestamp {
        throw new Error('Method not implemented.');
    }
    getBinding(): string {
        throw new Error('Method not implemented.');
    }
    deleteState(key: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    setStateValidationParameter(key: string, ep: Buffer): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getStateValidationParameter(key: string): Promise<Buffer> {
        throw new Error('Method not implemented.');
    }
    getStateByRange(startKey: string, endKey: string): 
        Promise<import('fabric-shim').Iterators.StateQueryIterator> {
        throw new Error('Method not implemented.');
    }
    getStateByRangeWithPagination(startKey: string, endKey: string, 
        pageSize: number, bookmark?: string): 
        Promise<import('fabric-shim').StateQueryResponse<import('fabric-shim').Iterators.StateQueryIterator>> {
        throw new Error('Method not implemented.');
    }
    getStateByPartialCompositeKey(objectType: string, attributes: string[]): 
        Promise<import('fabric-shim').Iterators.StateQueryIterator> {
        throw new Error('Method not implemented.');
    }
    getStateByPartialCompositeKeyWithPagination(objectType: string, attributes: string[], 
        pageSize: number, bookmark?: string): 
        Promise<import('fabric-shim').StateQueryResponse<import('fabric-shim').Iterators.StateQueryIterator>> {
        throw new Error('Method not implemented.');
    }
    getQueryResult(query: string): Promise<import('fabric-shim').Iterators.StateQueryIterator> {
        throw new Error('Method not implemented.');
    }
    getQueryResultWithPagination(query: string, pageSize: number, bookmark?: string): 
    Promise<import('fabric-shim').StateQueryResponse<import('fabric-shim').Iterators.StateQueryIterator>> {
        throw new Error('Method not implemented.');
    }
    getHistoryForKey(key: string): Promise<import('fabric-shim').Iterators.HistoryQueryIterator> {
        throw new Error('Method not implemented.');
    }
    invokeChaincode(chaincodeName: string, args: string[], channel: string): 
    Promise<import('fabric-shim').ChaincodeResponse> {
        throw new Error('Method not implemented.');
    }
    setEvent(name: string, payload: Buffer): void {
        throw new Error('Method not implemented.');
    }
    createCompositeKey(objectType: string, attributes: string[]): string {
        throw new Error('Method not implemented.');
    }
    splitCompositeKey(compositeKey: string): import('fabric-shim').SplitCompositekey {
        throw new Error('Method not implemented.');
    }
    async getPrivateData(collection: string, key: string): Promise<Buffer> {
        return this.privateMap.get(key);
    }
    getPrivateDataHash(collection: string, key: string): Promise<Buffer> {
        throw new Error('Method not implemented.');
    }
    async putPrivateData(collection: string, key: string, value: Buffer): Promise<void> {
        this.privateMap.set(key, value);
    }
    deletePrivateData(collection: string, key: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    setPrivateDataValidationParameter(collection: string, key: string, ep: Buffer): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getPrivateDataValidationParameter(collection: string, key: string): Promise<Buffer> {
        throw new Error('Method not implemented.');
    }
    getPrivateDataByRange(collection: string, startKey: string, endKey: string): 
        Promise<import('fabric-shim').Iterators.StateQueryIterator> {
        throw new Error('Method not implemented.');
    }
    getPrivateDataByPartialCompositeKey(collection: string, objectType: string, attributes: string[]): 
        Promise<import('fabric-shim').Iterators.StateQueryIterator> {
        throw new Error('Method not implemented.');
    }
    getPrivateDataQueryResult(collection: string, query: string): 
        Promise<import('fabric-shim').Iterators.StateQueryIterator> {
        throw new Error('Method not implemented.');
    }
}