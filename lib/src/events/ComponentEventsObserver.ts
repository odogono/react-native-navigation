import * as _ from 'lodash';
import { EventSubscription } from '../interfaces/EventSubscription';
import {
  ComponentDidAppearEvent,
  ComponentDidDisappearEvent,
  NavigationButtonPressedEvent,
  SearchBarUpdatedEvent,
  SearchBarCancelPressedEvent,
  ComponentEvent,
  PreviewCompletedEvent,
  ModalDismissedEvent,
  SideMenuDidAppearEvent,
  SideMenuDidDisappearEvent
} from '../interfaces/ComponentEvents';
import { NativeEventsReceiver } from '../adapters/NativeEventsReceiver';

export class ComponentEventsObserver {
  private readonly listeners = {};
  private alreadyRegistered = false;

  constructor(private readonly nativeEventsReceiver: NativeEventsReceiver) {
    this.notifyComponentDidAppear = this.notifyComponentDidAppear.bind(this);
    this.notifyComponentDidDisappear = this.notifyComponentDidDisappear.bind(this);
    this.notifyNavigationButtonPressed = this.notifyNavigationButtonPressed.bind(this);
    this.notifyModalDismissed = this.notifyModalDismissed.bind(this);
    this.notifySearchBarUpdated = this.notifySearchBarUpdated.bind(this);
    this.notifySearchBarCancelPressed = this.notifySearchBarCancelPressed.bind(this);
    this.notifyPreviewCompleted = this.notifyPreviewCompleted.bind(this);
    this.notifySideMenuDidAppear = this.notifySideMenuDidAppear.bind(this);
    this.notifySideMenuDidDisappear = this.notifySideMenuDidDisappear.bind(this);
  }

  public registerOnceForAllComponentEvents() {
    if (this.alreadyRegistered) { return; }
    this.alreadyRegistered = true;
    this.nativeEventsReceiver.registerComponentDidAppearListener(this.notifyComponentDidAppear);
    this.nativeEventsReceiver.registerComponentDidDisappearListener(this.notifyComponentDidDisappear);
    this.nativeEventsReceiver.registerNavigationButtonPressedListener(this.notifyNavigationButtonPressed);
    this.nativeEventsReceiver.registerModalDismissedListener(this.notifyModalDismissed);
    this.nativeEventsReceiver.registerSearchBarUpdatedListener(this.notifySearchBarUpdated);
    this.nativeEventsReceiver.registerSearchBarCancelPressedListener(this.notifySearchBarCancelPressed);
    this.nativeEventsReceiver.registerPreviewCompletedListener(this.notifyPreviewCompleted);
    this.nativeEventsReceiver.registerSideMenuDidAppearListener(this.notifySideMenuDidAppear);
    this.nativeEventsReceiver.registerSideMenuDidDisappearListener(this.notifySideMenuDidDisappear);
  }

  public bindComponent(component: React.Component<any>, componentId?: string): EventSubscription {
    const computedComponentId = componentId || component.props.componentId;

    if (!_.isString(computedComponentId)) {
      throw new Error(`bindComponent expects a component with a componentId in props or a componentId as the second argument`);
    }
    if (_.isNil(this.listeners[computedComponentId])) {
      this.listeners[computedComponentId] = {};
    }
    const key = _.uniqueId();
    this.listeners[computedComponentId][key] = component;

    return { remove: () => _.unset(this.listeners[computedComponentId], key) };
  }

  public unmounted(componentId: string) {
    _.unset(this.listeners, componentId);
  }

  notifyComponentDidAppear(event: ComponentDidAppearEvent) {
    this.triggerOnAllListenersByComponentId(event, 'componentDidAppear');
  }

  notifyComponentDidDisappear(event: ComponentDidDisappearEvent) {
    this.triggerOnAllListenersByComponentId(event, 'componentDidDisappear');
  }

  notifyNavigationButtonPressed(event: NavigationButtonPressedEvent) {
    this.triggerOnAllListenersByComponentId(event, 'navigationButtonPressed');
  }

  notifyModalDismissed(event: ModalDismissedEvent) {
    this.triggerOnAllListenersByComponentId(event, 'modalDismissed');
  }

  notifySearchBarUpdated(event: SearchBarUpdatedEvent) {
    this.triggerOnAllListenersByComponentId(event, 'searchBarUpdated');
  }

  notifySearchBarCancelPressed(event: SearchBarCancelPressedEvent) {
    this.triggerOnAllListenersByComponentId(event, 'searchBarCancelPressed');
  }

  notifyPreviewCompleted(event: PreviewCompletedEvent) {
    this.triggerOnAllListenersByComponentId(event, 'previewCompleted');
  }

  notifySideMenuDidAppear(event: SideMenuDidAppearEvent) {
    this.triggerOnAllListenersByComponentId(event, 'sideMenuDidAppear');
  }

  notifySideMenuDidDisappear(event: SideMenuDidDisappearEvent) {
    this.triggerOnAllListenersByComponentId(event, 'sideMenuDidDisappear');
  }

  private triggerOnAllListenersByComponentId(event: ComponentEvent, method: string) {
    _.forEach(this.listeners[event.componentId], (component) => {
      if (_.isObject(component) && _.isFunction(component[method])) {
        component[method](event);
      }
    });
  }
}
