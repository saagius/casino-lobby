import { TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { GameService } from './services/game.service';
import { AppComponent } from './app.component';
import { declarations } from './app.module';

describe('Router', () => { 
    let injector: TestBed;
    let router: Router;
    let location: Location;

    beforeEach(() => { 
        TestBed.configureTestingModule({
            imports: [RouterTestingModule,
            RouterTestingModule.withRoutes(routes)], 
            declarations,
            providers: [{provide: GameService, useValue: {} }]
        });

        injector = getTestBed();
        router = injector.get(Router);
        location = injector.get(Location);
    });

    it('should be able to navigate to home (redirects to games) using commands API', 
        fakeAsync(() => {
            TestBed.createComponent(AppComponent); 
            router.navigate(['/']);
            tick(); 
            expect(location.path()).toBe('/games');
        })
    );

    it('should be able to navigate to games using commands API', 
        fakeAsync(() => {
            TestBed.createComponent(AppComponent);
            router.navigate(['/games']);
            tick();
            expect(location.path()).toBe('/games');
        })
    );

    it('should be able to navigate to games by URL', 
        fakeAsync(() => {
            TestBed.createComponent(AppComponent);
            router.navigateByUrl('/games');
            tick();
            expect(location.path()).toEqual('/games');
        })
    );
});