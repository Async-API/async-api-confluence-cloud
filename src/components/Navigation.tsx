import Button from "@atlaskit/button";
import IconComponent from './Icon';

import Icon from '../common/icons';

import {
  NavigationWrapper,
  NavigationHeader,
  NavigationHeaderH1,
  NavigationHeaderIcon,
  NavigationHeaderAsyncApiText,
  NavigationHeaderEditorText,
  NavigationLinks,
} from './styled';

interface IconData extends Icon {
  key: string;
}

function NavigationComponent (props: any):any {
  const iconsData: IconData[] = [
    {
      key: 'github',
      url: 'https://github.com/asyncapi/asyncapi-react',
      iconName: 'github',
    },
    {
      key: 'slack',
      url:
        'https://join.slack.com/t/asyncapi/shared_invite/enQtNDY3MzI0NjU5OTQyLWU4ZGU2MTg1MDIyZDFjMTI2YjkxYTdlMzc1NjgzYTAxZDM1YTg1NDhhMTE2NDliMjlhZjYxNzk0ZTE5ZGU1ZTg',
      iconName: 'slack',
    },
    {
      key: 'asyncapi',
      url: 'https://www.asyncapi.com/',
      iconName: 'globe',
      iconPrefix: 'fa',
    },
  ];

  return (
    <NavigationWrapper>
      <NavigationHeader>
        <NavigationHeaderH1>
          <NavigationHeaderIcon
            src="https://avatars0.githubusercontent.com/u/16401334?v=4&s=200"
            alt="AsyncAPI logo"
          />
          <NavigationHeaderAsyncApiText>
            AsyncAPI React
          </NavigationHeaderAsyncApiText>
          <NavigationHeaderEditorText>editor</NavigationHeaderEditorText>
        </NavigationHeaderH1>
      </NavigationHeader>
      <NavigationLinks>
        {iconsData.map(icon => (
          <IconComponent {...icon} key={icon.key} />
        ))}
      </NavigationLinks>
      <Button onClick={props.saveAndClose}
          appearance={'primary'} style={{marginTop: '6px'}}> &lt; Save and Go Back</Button>
    </NavigationWrapper>
  );
}

export default NavigationComponent;
