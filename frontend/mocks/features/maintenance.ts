/**
 * Mock Maintenance Request Data
 */

export interface MaintenanceAssignee {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

export interface MaintenanceRequest {
  id: string;
  requestId: string;
  propertyName: string;
  propertyId: string;
  tenantName: string;
  tenantId: string;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assignedTo?: MaintenanceAssignee;
  createdAt: string;
  updatedAt: string;
  deadline?: string;
  commentCount?: number;
  photoCount?: number;
  scheduledDate?: string;
  scheduledTime?: string;
}

export const MOCK_MAINTENANCE_REQUESTS: MaintenanceRequest[] = [
  {
    id: 'mnt-001',
    requestId: 'MNT-2026-001',
    propertyName: 'Sunset Apartments, Unit 4B',
    propertyId: 'prop-001',
    tenantName: 'Houston Housing Okafor',
    tenantId: 'tenant-001',
    title: 'Water leak in bathroom',
    description:
      'Water is leaking from the ceiling in the bathroom. Started 2 days ago.',
    status: 'OPEN',
    priority: 'HIGH',
    assignedTo: {
      id: 'maint-001',
      name: 'Emeka Plumbing Services',
      phone: '+234 801 234 5678',
    },
    createdAt: '2026-03-25T10:00:00.000Z',
    updatedAt: '2026-03-25T10:00:00.000Z',
    deadline: '2026-03-28T18:00:00.000Z',
    commentCount: 3,
    photoCount: 2,
    scheduledDate: '2026-03-26',
    scheduledTime: '09:00-10:00',
  },
  {
    id: 'mnt-002',
    requestId: 'MNT-2026-002',
    propertyName: 'Sunset Apartments, Unit 2A',
    propertyId: 'prop-001',
    tenantName: 'Adebayo Mensah',
    tenantId: 'tenant-002',
    title: 'Air conditioning not working',
    description:
      'AC unit stopped cooling yesterday. Makes strange noise when turned on.',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    assignedTo: {
      id: 'maint-002',
      name: 'Cool Air HVAC',
      phone: '+234 802 345 6789',
    },
    createdAt: '2026-03-20T14:30:00.000Z',
    updatedAt: '2026-03-22T09:15:00.000Z',
    deadline: '2026-03-25T18:00:00.000Z',
    commentCount: 5,
    photoCount: 1,
    scheduledDate: '2026-03-23',
    scheduledTime: '14:00-15:30',
  },
  {
    id: 'mnt-003',
    requestId: 'MNT-2026-003',
    propertyName: 'Glover Road, Ikoyi - Suite A',
    propertyId: 'prop-002',
    tenantName: 'Ada Nwosu',
    tenantId: 'tenant-003',
    title: 'Broken door lock',
    description: 'Front door lock is broken. Cannot lock the door properly.',
    status: 'COMPLETED',
    priority: 'HIGH',
    assignedTo: {
      id: 'maint-003',
      name: 'Security Lock Services',
      phone: '+234 803 456 7890',
    },
    createdAt: '2026-03-15T08:00:00.000Z',
    updatedAt: '2026-03-18T16:30:00.000Z',
    deadline: '2026-03-18T18:00:00.000Z',
    commentCount: 2,
    photoCount: 1,
  },
  {
    id: 'mnt-004',
    requestId: 'MNT-2026-004',
    propertyName: 'Admiralty Way, Block 4 - Floor 2',
    propertyId: 'prop-003',
    tenantName: 'Kunle Bello',
    tenantId: 'tenant-004',
    title: 'Electrical outlet not working',
    description:
      'Kitchen outlet stopped working. Tried resetting breaker but no luck.',
    status: 'OPEN',
    priority: 'MEDIUM',
    createdAt: '2026-03-22T11:20:00.000Z',
    updatedAt: '2026-03-22T11:20:00.000Z',
    deadline: '2026-03-25T18:00:00.000Z',
    commentCount: 0,
    photoCount: 0,
  },
];
