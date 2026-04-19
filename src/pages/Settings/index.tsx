import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { AlertConfiguration } from './components/AlertConfiguration';
import { DataSources } from './components/DataSources';
import { UserPreferences } from './components/UserPreferences';

export default function Settings() {
  return (
    <MainLayout title="Pengaturan" subtitle="Konfigurasi sistem dan preferensi pengguna">
      <div className="space-y-6 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AlertConfiguration />
          <DataSources />
        </div>
        <UserPreferences />
      </div>
    </MainLayout>
  );
}
