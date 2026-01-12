export interface DocsyDocument {
  readonly id: string;
  readonly title: string;
  readonly ownerId: string;
  readonly currentContent: string;
  readonly currentVersion: number;
  readonly isDeleted: boolean;
  readonly deletedAt: Date | null;
  readonly isPrivate: boolean;
  readonly lastViewedAt: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface DocsyDocumentCreate {
  title: string;
  currentContent: string;
  ownerId: string;
}

export interface DocsyDocumentUpdate {
  title?: string;
  currentContent?: string;
  lastViewedAt?: Date;
  ownerId?: string;
}
