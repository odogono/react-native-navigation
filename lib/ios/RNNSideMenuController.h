#import <UIKit/UIKit.h>
#import "RNNSideMenuChildVC.h"
#import "MMDrawerController.h"
#import "RNNParentProtocol.h"
#import "RNNEventEmitter.h"

@interface RNNSideMenuController : MMDrawerController <RNNParentProtocol>

- (instancetype)initWithLayoutInfo:(RNNLayoutInfo *)layoutInfo
			  childViewControllers:(NSArray *)childViewControllers
						   options:(RNNNavigationOptions *)options
					defaultOptions:(RNNNavigationOptions *)defaultOptions
						 presenter:(RNNBasePresenter *)presenter
					  eventEmitter:(RNNEventEmitter *)eventEmitter;


@property (readonly) RNNSideMenuChildVC *center;
@property (readonly) RNNSideMenuChildVC *left;
@property (readonly) RNNSideMenuChildVC *right;

@property (nonatomic, retain) RNNLayoutInfo* layoutInfo;
@property (nonatomic, retain) RNNViewControllerPresenter* presenter;
@property (nonatomic, strong) RNNNavigationOptions* options;
@property (nonatomic, strong) RNNNavigationOptions* defaultOptions;
@property (nonatomic, strong) RNNEventEmitter *eventEmitter;

- (void)side:(MMDrawerSide)side enabled:(BOOL)enabled;
- (void)side:(MMDrawerSide)side visible:(BOOL)visible;
- (void)side:(MMDrawerSide)side width:(double)width;
- (void)setAnimationType:(NSString *)animationType;

@end
