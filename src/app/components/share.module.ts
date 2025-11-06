import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Shared Pipe
// import { SafeHtmlPipe } from './pipes/safe-html.pipe';

// --- NG-ZORRO Modules ---
// We import and export all the NG-ZORRO modules
// that our application will use.
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGridModule } from 'ng-zorro-antd/grid';
// ... add any other NzModules you need here

const NG_ZORRO_MODULES = [
  NzLayoutModule,
  NzPageHeaderModule,
  NzMenuModule,
  NzResultModule,
  NzButtonModule,
  NzFormModule,
  NzInputModule,
  NzCardModule,
  NzIconModule,
  NzSpinModule,
  NzGridModule
];
// --- End NG-ZORRO ---

@NgModule({
  declarations: [
    // SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...NG_ZORRO_MODULES
  ],
  exports: [
    // Export modules and pipes for other modules to use
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // SafeHtmlPipe, // Export our shared pipe
    ...NG_ZORRO_MODULES
  ]
})
export class SharedModule { }