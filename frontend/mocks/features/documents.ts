/**
 * Mock Document Data
 */

export interface Document {
  id: string;
  name: string;
  type: 'LEASE' | 'INSPECTION' | 'MAINTENANCE' | 'AGREEMENT' | 'OTHER';
  status: 'ACTIVE' | 'ARCHIVED' | 'EXPIRED';
  propertyName: string;
  propertyId: string;
  tenantName?: string;
  tenantId?: string;
  fileSize: number;
  fileType: string;
  url: string;
  uploadedAt: string;
  expiresAt?: string;
  description?: string;
}

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'doc-001',
    name: 'Lease Agreement - Unit 4B',
    type: 'LEASE',
    status: 'ACTIVE',
    propertyName: 'Sunset Apartments, Unit 4B',
    propertyId: 'prop-001',
    tenantName: 'Houston Housing Okafor',
    tenantId: 'tenant-001',
    fileSize: 2458000,
    fileType: 'application/pdf',
    url: '/documents/lease-unit-4b.pdf',
    uploadedAt: '2026-01-15T10:00:00.000Z',
    expiresAt: '2027-01-15T10:00:00.000Z',
    description: 'Annual lease agreement for Unit 4B',
  },
  {
    id: 'doc-002',
    name: 'Move-in Inspection Report',
    type: 'INSPECTION',
    status: 'ACTIVE',
    propertyName: 'Sunset Apartments, Unit 4B',
    propertyId: 'prop-001',
    tenantName: 'Houston Housing Okafor',
    tenantId: 'tenant-001',
    fileSize: 1850000,
    fileType: 'application/pdf',
    url: '/documents/inspection-unit-4b.pdf',
    uploadedAt: '2026-01-15T11:00:00.000Z',
    description: 'Property condition report at move-in',
  },
  {
    id: 'doc-003',
    name: 'Maintenance Log - Q1 2026',
    type: 'MAINTENANCE',
    status: 'ACTIVE',
    propertyName: 'Sunset Apartments, Unit 4B',
    propertyId: 'prop-001',
    tenantName: 'Houston Housing Okafor',
    tenantId: 'tenant-001',
    fileSize: 956000,
    fileType: 'application/pdf',
    url: '/documents/maintenance-log-q1-2026.pdf',
    uploadedAt: '2026-03-25T14:30:00.000Z',
    description: 'Record of all maintenance requests and completions',
  },
  {
    id: 'doc-004',
    name: 'Lease Agreement - Suite A',
    type: 'LEASE',
    status: 'ACTIVE',
    propertyName: 'Glover Road, Ikoyi',
    propertyId: 'prop-002',
    tenantName: 'Ada Nwosu',
    tenantId: 'tenant-003',
    fileSize: 2100000,
    fileType: 'application/pdf',
    url: '/documents/lease-suite-a.pdf',
    uploadedAt: '2025-12-01T09:00:00.000Z',
    expiresAt: '2026-12-01T09:00:00.000Z',
    description: 'Annual lease agreement for Suite A',
  },
  {
    id: 'doc-005',
    name: 'Move-out Inspection Report',
    type: 'INSPECTION',
    status: 'ARCHIVED',
    propertyName: 'Admiralty Way, Block 4',
    propertyId: 'prop-003',
    tenantName: 'Previous Tenant',
    tenantId: 'tenant-old-001',
    fileSize: 1650000,
    fileType: 'application/pdf',
    url: '/documents/moveout-inspection-block4.pdf',
    uploadedAt: '2025-11-30T15:00:00.000Z',
    description: 'Property condition report at move-out',
  },
];
