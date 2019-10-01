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

import { Iterators } from 'fabric-shim';
import { Registration } from '../../main/model/Registration';
import { RegistrationHelper } from '../../main/model/RegistrationHelper';

export class TestStateQueryIterator implements Iterators.StateQueryIterator {
    testKV : {
        key: string;
        value: Buffer;
        getKey(): string;
        getValue(): Buffer;
    } = <any>{};

    constructor(data: Registration) {
        this.testKV.key = data.registrationId;
        this.testKV.value = RegistrationHelper.toBuffer(data);
    }

    get response() {
        return {
            results: this.testKV,
            has_more: false,
            metadata: Buffer.from(''),
            id: 'test'
        };
    }

    next(): Promise<Iterators.NextResult> {
        
        return Promise.resolve({
            value: this.testKV,
            done: true
        });
    }

    async close(): Promise<void> {
        return;
    }

    addListener(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error('Method not implemented.');
    }
    on(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error('Method not implemented.');
    }
    once(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error('Method not implemented.');
    }
    prependListener(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error('Method not implemented.');
    }
    prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error('Method not implemented.');
    }
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error('Method not implemented.');
    }
    off(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error('Method not implemented.');
    }
    removeAllListeners(event?: string | symbol): this {
        throw new Error('Method not implemented.');
    }
    setMaxListeners(n: number): this {
        throw new Error('Method not implemented.');
    }
    getMaxListeners(): number {
        throw new Error('Method not implemented.');
    }
    listeners(event: string | symbol): Function[] {
        throw new Error('Method not implemented.');
    }
    rawListeners(event: string | symbol): Function[] {
        throw new Error('Method not implemented.');
    }
    emit(event: string | symbol, ...args: any[]): boolean {
        throw new Error('Method not implemented.');
    }
    eventNames(): (string | symbol)[] {
        throw new Error('Method not implemented.');
    }
    listenerCount(type: string | symbol): number {
        throw new Error('Method not implemented.');
    }
}