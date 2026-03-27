export interface FinalUserData {
    id: string;
    user_id: string;
    operatorId: string;
    balance: string;
    token?: string;
    game_id?: string;
}

// App config
export interface AppConfig {
    minBetAmount: number;
    maxBetAmount: number;
    maxCashoutAmount: number;
    dbConfig: DBConfig;
    redis: RedisConfig;
}

interface DBConfig {
    host: string;
    user: string;
    database: string;
    password: string;
    port: string;
    retries: string;
    interval: string;
}
 
interface RedisConfig {
    host: string;
    port: number;
    retry: number;
    interval: number;
}
 
// Logger related
export interface LogEntry {
    time: number;
    level: LogLevel;
    name: string;
    msg: string;
}
 
export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';


// Webhook keys
export type WebhookKey = 'CREDIT' | 'DEBIT';

// Webhook result
export interface AccountsResult {
    txn_id?: string;
    status: boolean;
    type: WebhookKey;
}

// Webhook request data
export interface WebhookData {
    txn_id: string;
    ip?: string;
    roundId?: string;
    user_id: string;
    game_id? : number,
    amount?: number | string;
    description?: string;
    bet_id?: string;
    txn_type?: number;
    txn_ref_id?: string;
}

// Player details for webhook calls
export interface PlayerDetails {
    game_id: string;
    operatorId: string;
    token: string;
}

// Bets for webhook / upstream
export interface BetsData {
    id?: number;
    bet_amount?: number | string;
    winning_amount?: number | string;
    game_id?: string;
    user_id: string;
    bet_id?: string;
    txn_id?: string;
    txn_ref_id?: string;
    ip?: string;
}