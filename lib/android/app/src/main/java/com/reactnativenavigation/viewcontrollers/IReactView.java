package com.reactnativenavigation.viewcontrollers;

import android.view.MotionEvent;
import android.view.View;

import com.reactnativenavigation.interfaces.ScrollEventListener;
import com.reactnativenavigation.views.element.Element;

import java.util.List;

public interface IReactView extends Destroyable {

    boolean isReady();

    View asView();

    void sendComponentStart();

    void sendComponentStop();

    void sendOnNavigationButtonPressed(String buttonId);

    void sendSideMenuAppeared();

    void sendSideMenuDisappeared();

    ScrollEventListener getScrollEventListener();

    void dispatchTouchEventToJs(MotionEvent event);

    boolean isRendered();

    List<Element> getElements();
}
