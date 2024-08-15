/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { OverlayTemplate } from "couriourc-klinecharts";

const textInput: OverlayTemplate = {
  name: "brush",
  totalStep: 2,
  needDefaultPointFigure: false,
  needDefaultXAxisFigure: false,
  needDefaultYAxisFigure: false,
  onPressedMoveStart() {
    return true;
  },
  createPointFigures(overlayFigure) {
    if (overlayFigure.coordinates.length > 1) {
      return [
        {
          type: "polygon",
          attrs: {
            coordinates: [
              overlayFigure.coordinates[0],
              {
                x: overlayFigure.coordinates[1].x,
                y: overlayFigure.coordinates[0].y
              },
              overlayFigure.coordinates[1],
              {
                x: overlayFigure.coordinates[0].x,
                y: overlayFigure.coordinates[1].y
              }
            ]
          },
          styles: { style: "stroke_fill" }
        }
      ];
    }
    return [];
  }
};

export default textInput;
