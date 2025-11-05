import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { MailOutline, KeyOutline, LoginOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

// This is the correct way to provide icons in a standalone setup
export function provideNzIcons(): EnvironmentProviders {
    return importProvidersFrom(NzIconModule.forRoot([
        MailOutline,
        KeyOutline,
        LoginOutline
    ]));
}