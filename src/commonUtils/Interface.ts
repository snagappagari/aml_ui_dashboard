// src/types/index.ts or wherever you keep shared types

export interface Alert {
    id: string;
    description: string;
    date: string;
    rule: string;
    alertStatus?: string;
    amount?: string;
    transactionType?: string;
    network?: string;
    country?: string;
    ruleVersion?: string;
    owner?: string;
    caseID?: string;
    downloadFile?: string;
  }
  
  export interface ApiAlert {
    alertId: string;
    transactionId: string;
    alertType: string;
    ruleId: number;
    status: string;
    country: string;
    region: string;
    city: string;
    mailSent: boolean;
    latitude: number;
    longitude: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface AlertCountData {
    TOTAL: number;
    HIGH: number;
    MEDIUM: number;
    LOW: number;
    CRITICAL: number;
  }