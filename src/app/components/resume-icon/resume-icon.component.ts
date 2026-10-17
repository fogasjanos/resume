import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  faUser,
  faWrench,
  faLaptopCode,
  faGraduationCap,
  faLanguage,
  faComment,
  faRocket,
  faBookOpenReader,
  faList,
  faBriefcase,
  faLightbulb,
  faDice,
  faLocationDot,
  faPhone,
  faEnvelope,
  faGlobe,
  faMobileScreenButton,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

// Explicit imports keep the bundle small and preserve existing JSON style names.
const ICONS: Readonly<Record<string, typeof faUser>> = {
  'fa-user': faUser,
  'fa-wrench': faWrench,
  'fa-laptop-code': faLaptopCode,
  'fa-graduation-cap': faGraduationCap,
  'fa-language': faLanguage,
  'fa-comment': faComment,
  'fa-rocket': faRocket,
  'fa-book-open-reader': faBookOpenReader,
  'fa-list': faList,
  'fa-briefcase': faBriefcase,
  'fa-lightbulb': faLightbulb,
  'fa-dice': faDice,
  'fa-location-dot': faLocationDot,
  'fa-phone': faPhone,
  'fa-envelope': faEnvelope,
  'fa-globe': faGlobe,
  'fa-mobile-screen-button': faMobileScreenButton,
  'fa-paper-plane': faPaperPlane,
  'fa-github': faGithub,
  'fa-linkedin': faLinkedin,
};

@Component({
  selector: 'app-resume-icon',
  template: `<svg [attr.viewBox]="drawing().viewBox" aria-hidden="true" role="presentation" focusable="false" fill="currentColor">
    @for (path of drawing().paths; track $index) {
      <path [attr.d]="path" />
    }
  </svg>`,
  styles: ['svg { display: block; width: 100%; height: 100%; }'],
  host: { 'aria-hidden': 'true', role: 'presentation' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeIconComponent {
  readonly name = input.required<string>();
  readonly drawing = computed(() => {
    const key = this.name()
      .split(/\s+/)
      .find((token) => Object.hasOwn(ICONS, token));
    const [width, height, , , paths] = ICONS[key ?? 'fa-list'].icon;
    return { viewBox: `0 0 ${width} ${height}`, paths: Array.isArray(paths) ? paths : [paths] };
  });
}
