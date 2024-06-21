/* eslint-disable no-use-before-define */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { baseTheme } from 'src/const/baseTheme';
import { TEXTSTYLES } from 'src/const/TEXTSTYLES';
import PropTypes from 'prop-types';

import { If, Then } from 'react-if';

const SIZES = {
  xtra: {
    '--height': '48px',
    '--padding': '0 16px',
    '--min-width': '96px',
    '--font-size': '14px',
    '--font-weight': '600',
  },
  big: {
    '--height': '36px',
    '--padding': '0 16px',
    '--min-width': '96px',
    '--font-size': '14px',
    '--font-weight': '600',
  },
  small: {
    '--height': '32px',
    '--padding': '0 16px',
    '--min-width': '96px',
    '--font-size': '14px',
    '--font-weight': '600',
  },
};

export const Button = forwardRef(
  (
    {
      variant = 'primary',
      size = 'big',
      children,
      disabled,
      full,
      style,
      redTheme,
      iconLeft,
      iconRight,
      ...props
    },
    ref,
  ) => {
    const styles = SIZES[size];

    let Component;
    if (variant === 'primary') {
      Component = PrimaryButton;
    } else if (variant === 'secondary') {
      Component = SecondaryButton;
    } else if (variant === 'tertiary') {
      Component = TertiaryButton;
    } else if (variant === 'ghost') {
      Component = GhostButton;
    } else if (variant === 'primary-square') {
      Component = PrimaryButtonSquare;
    } else if (variant === 'secondary-square') {
      Component = SecondaryButtonSquare;
    } else if (variant === 'tertiary-square') {
      Component = TertiaryButtonSquare;
    } else if (variant === 'quarternary-square') {
      Component = QuarternaryButtonSquare;
    } else if (variant === 'ghost-square') {
      Component = GhostButtonSquare;
    } else {
      throw new Error(`Unrecognized Button variant: ${variant}`);
    }

    return (
      <ThemeProvider theme={baseTheme}>
        <Component
          ref={ref}
          style={{
            ...styles,
            ...style,
          }}
          size={size}
          disabled={disabled}
          full={full}
          redTheme={redTheme}
          {...props}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <If condition={iconLeft}>
              <Then>{iconLeft}</Then>
            </If>
            {children}
            <If condition={iconRight}>
              <Then>{iconRight}</Then>
            </If>
          </div>
        </Component>
      </ThemeProvider>
    );
  },
);

const ButtonBase = styled.button`
  ${(p) => (p.size === 'big' ? TEXTSTYLES.button : TEXTSTYLES.buttonMobile)}
  padding: var(--padding);
  height: var(--height);
  min-width: var(--min-width);
  border-radius: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-weight: var(--font-weight);
  font-size: var(--font-size);
  line-height: 22px;
  cursor: pointer;
  ${({ full }) => (full ? 'width: 100%;' : '')}
`;

const PrimaryButton = styled(ButtonBase)`
  border: 2px solid
    ${(p) => (p.disabled ? p.theme.grey.lighter : p.theme.pink.regular)};
  background-color: ${(p) => p.theme.pink.regular};
  color: ${(p) => p.theme.white};
  transition: 0.3s all;

  &:hover {
    background-color: ${(p) => p.theme.pink.dark};
  }

  &:disabled {
    background-color: ${(p) => p.theme.grey.lighter};
    border: 2px solid ${(p) => p.theme.grey.lighter};
  }
`;

const SecondaryButton = styled(ButtonBase)`
  border: 2px solid
    ${(p) => (p.disabled ? p.theme.grey.lighter : p.theme.pink.lightest)};
  background-color: ${(p) => p.theme.pink.lightest};
  color: ${(p) => p.theme.pink.regular};

  &:hover {
    background-color: ${(p) => p.theme.pink.lightest};
    color: ${(p) => p.theme.pink.dark};
  }

  &:disabled {
    background-color: ${(p) => p.theme.grey.lighter};
    color: ${(p) => p.theme.white};
  }
`;

const TertiaryButton = styled(ButtonBase)`
  color: ${(p) => (p.redTheme ? p.theme.red.regular : p.theme.pink.regular)};
  background-color: transparent;
  border: 2px solid
    ${(p) => (p.redTheme ? p.theme.red.regular : p.theme.pink.regular)};
  &:hover {
    color: ${(p) => (p.redTheme ? p.theme.red.regular : p.theme.pink.dark)};
    border: 2px solid
      ${(p) => (p.redTheme ? p.theme.red.regular : p.theme.pink.dark)};
  }

  &:disabled {
    color: ${(p) => p.theme.grey.lighter};
    border: 2px solid ${(p) => p.theme.grey.lighter};
  }
`;

const GhostButton = styled(ButtonBase)`
  color: ${(p) => p.theme.pink.regular};
  background-color: transparent;
  border: 2px solid transparent;
  &:hover {
    color: ${(p) => p.theme.pink.dark};
  }

  &:disabled {
    color: ${(p) => p.theme.grey.lighter};
  }
`;

const PrimaryButtonSquare = styled(ButtonBase)`
  background-color: ${(p) => p.theme.pink.regular};
  color: ${(p) => p.theme.white};
  border-radius: 8px;
  &:hover {
    background-color: ${(p) => p.theme.pink.dark};
  }

  &:disabled {
    background-color: ${(p) => p.theme.grey.lighter};
  }
`;

const SecondaryButtonSquare = styled(ButtonBase)`
  background-color: ${(p) => p.theme.pink.lightest};
  color: ${(p) => p.theme.pink.regular};

  &:hover {
    background-color: ${(p) => p.theme.pink.lightest};
    color: ${(p) => p.theme.pink.dark};
  }

  &:disabled {
    background-color: ${(p) => p.theme.grey.lighter};
    color: ${(p) => p.theme.white};
  }
`;

const TertiaryButtonSquare = styled(ButtonBase)`
  color: ${(p) => (p.redTheme ? p.theme.red.regular : p.theme.pink.regular)};
  background-color: transparent;
  border: 2px solid
    ${(p) => (p.redTheme ? p.theme.red.regular : p.theme.pink.regular)};
  border-radius: 10px;
  &:hover {
    color: ${(p) => (p.redTheme ? p.theme.red.regular : p.theme.pink.dark)};
    border: 2px solid
      ${(p) => (p.redTheme ? p.theme.red.regular : p.theme.pink.dark)};
  }

  &:disabled {
    color: ${(p) => p.theme.grey.lighter};
    border: 2px solid ${(p) => p.theme.grey.lighter};
  }
`;

const QuarternaryButtonSquare = styled(ButtonBase)`
  color: ${(p) => (p.redTheme ? p.theme.red.regular : p.theme.green.dark)};
  background-color: transparent;
  border: 2px solid
    ${(p) => (p.redTheme ? p.theme.red.regular : p.theme.green.dark)};
  border-radius: 10px;
  &:hover {
    color: ${(p) => (p.redTheme ? p.theme.red.regular : p.theme.green.darker)};
    border: 2px solid
      ${(p) => (p.redTheme ? p.theme.red.regular : p.theme.green.darker)};
  }

  &:disabled {
    color: ${(p) => p.theme.grey.lighter};
    border: 2px solid ${(p) => p.theme.grey.lighter};
  }
`;

const GhostButtonSquare = styled(ButtonBase)`
  color: ${(p) => p.theme.pink.regular};
  border: none;
  padding: 12px;
  border-radius: unset;
  background: transparent;

  &:hover {
    color: ${(p) => p.theme.pink.dark};
  }

  &:disabled {
    color: ${(p) => p.theme.grey.lighter};
  }
`;

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'ghost']),
  size: PropTypes.oneOf(['small', 'big', 'xtra']),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  full: PropTypes.bool,
};
