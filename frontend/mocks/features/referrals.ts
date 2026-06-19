/**
 * Mock Referral Data\n */

export interface Referral {
  id: string;
  referredName: string;
  status: 'PENDING' | 'COMPLETED' | 'REWARDED';
  createdAt: string;
  rewardAmount?: number;
}

export interface ReferralStats {
  totalReferrals: number;
  completedReferrals: number;
  totalRewards: number;
  referrals: Referral[];
  referralCode: string;
}

export const MOCK_REFERRAL_STATS: ReferralStats = {
  totalReferrals: 12,
  completedReferrals: 8,
  totalRewards: 80,
  referrals: [
    {
      id: '1',
      referredName: 'John Doe',
      status: 'REWARDED',
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      rewardAmount: 10,
    },
    {
      id: '2',
      referredName: 'Jane Smith',
      status: 'REWARDED',
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      rewardAmount: 10,
    },
    {
      id: '3',
      referredName: 'Michael Brown',
      status: 'COMPLETED',
      createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      rewardAmount: 10,
    },
    {
      id: '4',
      referredName: 'Emily Davis',
      status: 'PENDING',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '5',
      referredName: 'Chris Wilson',
      status: 'PENDING',
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
  ],
  referralCode: 'HUSTON_HOUSING-TRUST-2024',
};
